import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import Vector from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import LayerGroup from "ol/layer/Group";
import ScaleLine from "ol/control/ScaleLine";
import Attribution from "ol/control/Attribution";
import Feature from 'ol/Feature';
import DragZoom from "ol/interaction/DragZoom";
import DoubleClickZoom from "ol/interaction/DoubleClickZoom";
import Modify from "ol/interaction/Modify";
import Draw from "ol/interaction/Draw";
import Collection from "ol/Collection";





class MapService extends FuseUtils.EventEmitter {
  
  constructor(map, opts) {
    super();
    
    this.map = map;
    //this.map.on("click", this._coordinatesListener.bind(this));
    // this.map.getInteractions().forEach((interaction) => {
    //   // se elimina DragZoom porque interfiere con el comportamiento de otras interacciones
    //   if (interaction instanceof DragZoom || interaction instanceof DoubleClickZoom) {
    //     this.map.removeInteraction(interaction);
    //   }
    // });
    this.layers = [];
    //this.toolbar = new Toolbar();
    //this.map.addControl(this.toolbar);
    // this._addSelectInteraction();

  }


  _addSelectInteraction() {
    this.selectInteraction = new SelectM30();
    this.selectInteraction.setActive(false);
    this.map.addInteraction(this.selectInteraction);

    this.selectInteraction.on(events.SELECT_FEATURES, (e) => {
      const features = e.target;
      const selectedFeatureIDs = this._transformFeaturesLayerObject(features);
      this.emit(events.SELECT_FEATURES, { ...e, selectedFeatureIDs });
    });
  }

  _initMeasureService() {
    this.measures = new MeasureService({ initType: "LineString" });
    this.measures.setActive(false);
    this.map.addInteraction(this.measures);
  }

  addToolbars(toolbars = []) {
    toolbars.forEach(({ element, name }) => {
      if (element) this.toolbar.addToolbar(name, element);
    });
  }

  removeToolbars() {
    this.toolbar.removeToolbars();
  }

  setProjection(proj) {
    this.projection = proj;
  }

  getMap() {
    return this.map;
  }

  mountMap({ element }) {
    this.map.setTarget(element);
  }

  unMountMap() {
    // this.map.setLayers([]);
    this.map.setTarget(undefined);
  }

  updateLayers(layers) {
    this.map.setLayers(layers);
    // si no se añade aquí, se pierde la capa de medidas
    this.map.addLayer(this.measures.getVectorLayer());
  }

  _coordinatesListener(e) {
    const coords = e.coordinate;
    const hitFeature = e.map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    this.emit(events.MOUSE_CLICK_MAP, { coordinates: coords, hitFeature });
  }

  updateMapSize(delay = 50) {
    setTimeout(() => {
      this.map.updateSize();
    }, delay);
  }

  createLayer(properties) {
    switch (properties[layerDefConfig.LAYER_TYPE_KEY]) {
      case layerDefConfig.VECTOR_LAYER_TYPE:
        return this.createVectorLayer(properties);
      case layerDefConfig.TILE_XYZ_LAYER_TYPE:
        return MapService.createTileXYZLayer(properties);
      default:
        return null;
    }
  }

  tocToMap(tocNodes, parent = 0) {
    if (parent === 0) tocNodes = tocNodes.slice(0).reverse();
    return tocNodes
      .filter((node) => {
        return node.parent === parent;
      })
      .map((node) => {
        if (node.droppable) {
          const layers = this.tocToMap(tocNodes, node.id);
          return MapService.createGroupLayer({
            groupId: node.id,
            visible: node.data.visible,
            layers,
          });
        }

        if (!this.layers[node.id]) {
          this.layers[node.id] = this.createLayer(node.data.layerProps);
        }
        this.layers[node.id].setVisible(node.data.visible);
        return this.layers[node.id];
      });
  }

  static createTileXYZLayer(params) {
    return new TileLayer({
      source: new XYZ({
        attributions: params.attributions,
        url: params[layerDefConfig.LAYER_URL_FIELD],
        maxZoom: params.max_zoom,
      }),
      visible: params[layerDefConfig.VISIBLE_LAYER_FIELD],
      opacity: params.opacity,
      properties: {
        id: params[layerDefConfig.LAYER_ID_FIELD],
        name: params.name,
        title: params[layerDefConfig.LAYER_TITLE_FIELD],
      },
    });
  }

  createVectorLayer(params) {
    const { symbology } = params;
    const style = symbologyEngine(symbology);
    const self = this;
    return new CustomVectorLayer({
      source: new Vector({
        attributions: params.attributions,
        url: params[layerDefConfig.LAYER_URL_FIELD],
        format: new GeoJSON(),
        loader: async function (extent, resolution, projection, success, failure) {
          try {
            const response = await axios.get(params[layerDefConfig.LAYER_URL_FIELD]);
            if (response.status === 200) {
              const features = this.getFormat().readFeatures(response.data);
              this.addFeatures(features);
              success(features);
            } else {
              throw new Error();
            }
          } catch (e) {
            this.removeLoadedExtent(extent);
            failure();
            self.emit(events.LAYER_LOAD_ERROR, {
              layerName: params[layerDefConfig.LAYER_TITLE_FIELD],
            });
          }
        },
      }),
      visible: params[layerDefConfig.VISIBLE_LAYER_FIELD],
      opacity: params.opacity,
      // maxZoom: params.max_zoom
      // minZoom: params.min_zoom
      properties: {
        id: params[layerDefConfig.LAYER_ID_FIELD],
        name: params.name,
        title: params[layerDefConfig.LAYER_TITLE_FIELD],
      },
      style,
    });
  }

  static createGroupLayer(params) {
    return new LayerGroup({
      layers: params.layers,
      visible: params.visible,
      properties: {
        groupId: params.groupId,
        group: true,
      },
    });
  }

  getLayers() {
    return this.layers;
  }

  getLayer(layerId) {
    return this.layers[layerId];
  }

  getVectorLayers() {
    const layers = this.layers.filter((layer) => layer instanceof CustomVectorLayer);
    return layers;
  }

  getFeature(featureID) {
    let feature;
    const layers = this.getVectorLayers();
    layers.find((layer) => {
      feature = layer.getFeature(featureID);
      if (feature) return true;
      return false;
    });
    return feature;
  }

  notifyToSelectionBox(feature, layer, action) {
    if (action === "delete" || action === "update")
      this.emit(events.SELECTION_OUT_BOX, {
        selectedFeatureIDs: [feature.get(featuresConfig.INTERNAL_ID)],
      });
    if (action === "add" || action === "update")
      this.emit(events.SELECTION_TO_BOX, {
        selectedFeatureIDs: [
          {
            id: feature.get(featuresConfig.INTERNAL_ID),
            layer: layer.get(layerDefConfig.LAYER_ID_FIELD),
            layerName: layer.get(layerDefConfig.LAYER_NAME_FIELD),
          },
        ],
      });
  }

  addToSelectionBox(selectedFeatureIDs) {
    this.emit(events.SELECTION_TO_BOX, {
      selectedFeatureIDs,
    });
  }

  removeFromSelectionBox(selectedFeatureIDs) {
    this.emit(events.SELECTION_OUT_BOX, {
      selectedFeatureIDs,
    });
  }

  addFeature(layerName, props) {
    const format = new GeoJSON({
      dataProjection: this.projection,
    });
    const feature = format.readFeature({ ...props, type: "Feature" });
    this.getVectorLayers().forEach((layer) => {
      if (layer.get(layerDefConfig.LAYER_NAME_FIELD) === layerName) {
        console.log("Feature añadida: ", feature);
        layer.addFeature(feature);
        this.notifyToSelectionBox(feature, layer, "add");
      }
      return;
    });
    this.selectFeatures([]);
  }

  replaceFeature(featureId, props) {
    const format = new GeoJSON({
      dataProjection: this.projection,
    });
    const tmpFeature = format.readFeature({
      ...props,
      type: "Feature",
    });
    this.backupFeature = undefined;
    this.getVectorLayers().forEach((layer) => {
      const feature = layer.getFeature(featureId);
      if (feature) {
        feature.setProperties(tmpFeature.getProperties());
        this.notifyToSelectionBox(feature, layer, "update");
      }
      return;
    });
    this.selectFeatures([]);
  }

  deleteFeature(featureId) {
    this.getVectorLayers().forEach((layer) => {
      let feature = layer.getFeature(featureId);
      if (feature) {
        this.emit(events.SELECT_FEATURES, {});
        this.selectInteraction.unSelectFeatures();
        this.notifyToSelectionBox(feature, layer, "delete");
        const source = layer.getSource();
        source.removeFeature(feature);
        this.backupFeature = undefined;
      }
      return;
    });
  }

  async drawNewFeature(layerProps) {
    if (this.drawInteraction instanceof Draw) {
      this.drawInteraction.abortDrawing();
      this.map.removeInteraction(this.drawInteraction);
    }
    const layer = this.layers[layerProps[layerDefConfig.LAYER_ID_FIELD]];
    if (layer) {
      this.selectFeatures([]);
      const layerProperties = await apiService.getLayerProperties(layerProps[layerDefConfig.LAYER_NAME_FIELD]);
      const features = await layer.getEntities();
      const geomType = features[0]
        ? features[0].geometry.type
        : layerProps.geometry_type === "polygon"
        ? "MultiPolygon"
        : layerProps.geometry_type === "line"
        ? "MultiLineString"
        : "Point";
      this.drawInteraction = new Draw({
        source: layer.getSource(),
        type: geomType,
      });

      this.drawInteraction.once("drawend", (e) => {
        const feature = e.feature;
        const format = new GeoJSON();
        const formatedFeature = format.writeFeatureObject(feature);

        layerProperties.forEach((p) => {
          feature.set(p[layerPropertiesConfig.PROPERTY_NAME], "");
        });
        feature.set(featuresConfig.FEATURE_ID_FIELD, Date.now());
        feature.set("new", true);
        layer.indexNewFeature(feature);
        layer.getSource().once("addfeature", () => {
          this.selectFeatures([feature.get(featuresConfig.INTERNAL_ID)]);
        });
        this.map.removeInteraction(this.drawInteraction);
        this.emit(events.DRAW_FEATURE, {
          feature: formatedFeature,
          layer,
        });
      });
      this.map.addInteraction(this.drawInteraction);
    }
  }

  async drawNewFeatureAtEntity(layerProps, previousEntity) {

    const layer = this.layers[layerProps[layerDefConfig.LAYER_ID_FIELD]];
    const previous_feature = this.getFeature(previousEntity.uniqueId);
    //console.log(previous_feature)
    const feature = new Feature({
      geometry: previous_feature.getGeometry(),
    });

    if (layer) {
      this.selectFeatures([]);
      const layerProperties = await apiService.getLayerProperties(layerProps[layerDefConfig.LAYER_NAME_FIELD]);
      const format = new GeoJSON();
      const formatedFeature = format.writeFeatureObject(feature);
      layerProperties.forEach((p) => {
        feature.set(p[layerPropertiesConfig.PROPERTY_NAME], "");
      });
      feature.set(featuresConfig.FEATURE_ID_FIELD, Date.now());
      feature.set("new", true);
      layer.indexNewFeature(feature);
      console.log(feature);
      layer.getSource().once("addfeature", () => {
        this.selectFeatures([feature.get(featuresConfig.INTERNAL_ID)]);
        this.emit(events.DRAW_FEATURE, {
          feature: formatedFeature,
          layer,
        });
        
      });
      layer.getSource().addFeature(feature)

    }

  }

  async updatePlacSymbology() {

    console.log("actulizando placas")
    const data = await apiService.getPlacasDB();
    const symology_properties = data.map((placa) => {

      const api_host = process.env.REACT_APP_API_HOST || `http://localhost:8000`;
      const codigo = placa["Código"]
      const symbol =  
      {
        "iconType": "image",
        "fieldValue": codigo,
        "src": `${api_host}/placas/${codigo.toLowerCase()}`,
        "scale": 1
      }
      return symbol
    });

    const in_toc = JSON.parse(window.localStorage.getItem("emesa-toc"))
    const plac_toc_index = in_toc.findIndex((ele) => { return ele.text == "PLAC"})
    in_toc[plac_toc_index].data.layerProps.symbology.properties = symology_properties;
    localStorage.setItem('emesa-toc', JSON.stringify(in_toc));
    
  }

  deleteUnsaved() {
    const layers = this.getVectorLayers();
    layers.forEach((layer) => {
      const source = layer.getSource();
      source.forEachFeature((feature) => {
        const isnew = feature.get("new");
        if (isnew) {
          console.log("delete feature");
          this.selectFeatures([]);
          source.removeFeature(feature);
          feature = null;
        }
      });
    });
  }

  startEditingFeature(featureID) {
    this.selectInteraction.setModify(true);
    if (this.editInteraction) {
      this.undoEditingFeature();
      this.stopEditingFeature();
    } else this.emit(events.START_EDITING);

    const feature = this.getFeature(featureID);
    if (feature) {
      feature.setStyle();
      this.backupFeature = feature.clone();
      this.editInteraction = new Modify({
        features: new Collection([feature], { unique: true }),
      });
      this.editInteraction.on("modifyend", (e) => {
        this.emit(events.MODIFY_FEATURE);
      });
      this.map.addInteraction(this.editInteraction);
      this.selectFeatures([featureID]);
    }
  }

  undoEditingFeature() {
    if (this.editInteraction && this.backupFeature) {
      const featureID = this.backupFeature.get(featuresConfig.INTERNAL_ID);
      const feature = this.getFeature(featureID);
      if (feature) feature.setGeometry(this.backupFeature.clone().getGeometry());
      this.emit(events.UNDO_EDITING);
    }
  }

  stopEditingFeature() {
    if (this.editInteraction) {
      this.map.removeInteraction(this.editInteraction);
      this.editInteraction = undefined;
      this.backupFeature = undefined;
      this.emit(events.STOP_EDITING);
    }
    this.selectInteraction.setModify(false);
    this.selectFeatures(this.selectInteraction.getSelectedFeatures().map((f) => f.get(featuresConfig.INTERNAL_ID)));
  }

  getEditingFeature() {
    if (this.editInteraction && this.backupFeature) {
      const featureID = this.backupFeature.get(featuresConfig.INTERNAL_ID);
      const feature = this.getFeature(featureID);
      if (feature) return featureID;
    }
    return undefined;
  }

  getSelectedFeatures() {
    const selectedFeatures = this.selectInteraction.getSelectedFeatures();
    return this._transformFeaturesLayerObject(selectedFeatures);
  }

  _transformFeaturesLayerObject(features) {
    const selectedFeatureIDs = {};
    features.forEach((f) => {
      const layer = this.selectInteraction.getLayer(f);
      const layerName = layer.get(layerDefConfig.LAYER_NAME_FIELD);
      if (selectedFeatureIDs[layerName]) selectedFeatureIDs[layerName].push(f.get(featuresConfig.INTERNAL_ID));
      else selectedFeatureIDs[layerName] = [f.get(featuresConfig.INTERNAL_ID)];
    });
    return selectedFeatureIDs;
  }

  customPromise() {
    let resolve = undefined;
    const promise = new Promise((r) => {
      resolve = r;
    });
    function done() {
      resolve();
    }
    function wait() {
      return promise;
    }
    return { done, wait };
  }
  // permite anular la peticion anterior si entra una nueva y la ultima no ha terminado de resolverse
  async getFeatures(featureIDs) {
    if (!this.promise) {
      this.promise = this.customPromise();
    } else {
      this.promise.done();
      this.promise = this.customPromise();
    }
    const localPromises = [Promise.all(this.selectionProcessing(featureIDs)), this.promise.wait()];
    return Promise.any(localPromises);
  }

  async selectFeatures(featureIDs) {
    const feat = await this.getFeatures(featureIDs);
    if (feat) {
      this.selectInteraction.unSelectFeatures();
      this.selectInteraction.selectFeatures(feat);
    }
  }

  selectionProcessing(featureIDs) {
    const featuresPromises = [];
    for (let id of featureIDs) {
      if (id) {
        const splitted = id.split("-");
        const layerId = splitted[splitted.length - 1];
        const layer = this.getLayer(parseInt(layerId));
        if (layer) {
          if (!layer.featuresLoaded)
            featuresPromises.push(
              (async () => {
                try {
                  await layer.forceLoadEntities();
                  const feature = layer.getFeature(id);
                  if (feature) return { feature, layer };
                  return null;
                } catch (e) {
                  return null;
                }
              })()
            );
          else {
            const feature = layer.getFeature(id);
            if (feature) featuresPromises.push({ feature, layer });
          }
        }
      }
    }
    return featuresPromises;
  }

  filterFeatures(filterFactory, filters) {
    const layers = this.getVectorLayers();
    layers.forEach((layer) => {
      layer.getSource().forEachFeature((feature) => {
        const filterCondition = filters[layer.get(layerDefConfig.LAYER_NAME_FIELD)];
        const filterFn = filterCondition ? filterFactory(filterCondition) : () => true;

        if (filterFn(feature.getProperties())) feature.set("visible", true);
        else feature.set("visible", false);
      });
    });
    this.unSelectNoVisibleFeatures();
  }

  filterLayerFeatures(layer, filters, variables) {
    layer.getSource().forEachFeature((feature) => {
       feature.set("visible", true);
       filters.map((filter, index) => {
            if (filters[index] && filters[index].length > 0 && !filters[index].includes(feature.get(variables[index].column))){
                feature.set("visible", false);
            }
       });
    });
  }


  unSelectNoVisibleFeatures() {
    const selectedFeatures = this.selectInteraction.getSelectedFeatures();
    this.selectFeatures(selectedFeatures.filter((f) => f.get("visible")).map((f) => f.get(featuresConfig.INTERNAL_ID)));
  }

  zoomTo(features) {
    let fit = false;
    const viewExtent = [Infinity, Infinity, -Infinity, -Infinity];
    features.forEach((f) => {
      const featureExtent = f.getGeometry()?.getExtent();
      if (featureExtent) {
        if (featureExtent[0] < viewExtent[0]) viewExtent[0] = featureExtent[0];
        if (featureExtent[1] < viewExtent[1]) viewExtent[1] = featureExtent[1];
        if (featureExtent[2] > viewExtent[2]) viewExtent[2] = featureExtent[2];
        if (featureExtent[3] > viewExtent[3]) viewExtent[3] = featureExtent[3];
        fit = true;
      }
    });
    if (fit) {
      this.map.getView().fit(viewExtent, {
        duration: 300,
        padding: [100, 200, 100, 200],
        maxZoom: 14,
      });
    }
  }

  zoomToSelected() {
    const selectedFeatures = this.selectInteraction.getSelectedFeatures();
    if (selectedFeatures.length > 0) {
      this.zoomTo(selectedFeatures);
    }
  }

  async zoomToFeatures(featureIDs) {
    if (Array.isArray(featureIDs) && featureIDs.length > 0) {
      const feat = await this.getFeatures(featureIDs);
      if (feat)
        this.zoomTo(
          feat.map((f) => {
            f.layer.setVisible(true);
            return f.feature;
          })
        );
    }
  }
}

export default MapService;

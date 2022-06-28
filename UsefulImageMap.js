/**
 * Image map drawn to canvas.
 */
class UsefulImageMap {
    /**
     * Construct.
     * @param el
     */
    constructor(el) {
        this.image = el;
        this.imageMap = document.querySelector(`[name=${this.image.useMap.split('#')[1]}]`);
        this.areas = this._getInitialMapAreas();
    }

    /**
     * Get the initial map areas as array of objects.
     * @returns {{}[]}
     * @private
     */
    _getInitialMapAreas() {
        let areas = this.imageMap.querySelectorAll('area');

        return Array.from(areas).map((el) => {
            return this._createAreaObjectFromElement(el);
        });
    }

    /**
     * Create area object from element.
     * @param el
     * @returns {{}}
     * @private
     */
    _createAreaObjectFromElement(el) {
        let areaObject = {}
        areaObject.attributes = {};

        el.getAttributeNames().forEach(key => areaObject.attributes[key] = el[key]);

        areaObject.coords = this._createAreaObjectCoords(areaObject);

        return areaObject;
    }

    /**
     * Create area coords from object attributes.
     * @param obj
     * @returns {{r: string, x: string, y: string}|[{x: string, y: string},{x: string, y: string}]}
     * @private
     */
    _createAreaObjectCoords(obj) {
        let arrCoords = obj.attributes.coords.split(',');
        let coords;

        switch (obj.attributes.shape) {
            case 'circle':
                coords = {
                    x: arrCoords[0],
                    y: arrCoords[1],
                    r: arrCoords[2],
                }
                break;
            case 'rect':
                coords = [{
                    x: arrCoords[0],
                    y: arrCoords[1],
                }, {
                    x: arrCoords[2],
                    y: arrCoords[3],
                }];
                break;
            case 'poly':
                coords = [];
                for (let i = 0; i < arrCoords.length; i = i + 2) {
                    coords.push({
                        x: arrCoords[i],
                        y: arrCoords[i + 1],
                    });
                }
                break;
        }

        return coords;
    }
}

export default UsefulImageMap;

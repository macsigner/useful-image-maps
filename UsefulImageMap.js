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
        this.scale = this._getScale();

        let resizeTimeout;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(this.update.bind(this), 500);
        });

        this.renderAreas();
    }

    /**
     * Update privates.
     */
    update() {
        this.scale = this._getScale();

        this.renderAreas();
    }

    /**
     * Render ares from this.areas.
     */
    renderAreas() {
        this.imageMap.innerHTML = '';

        for (let area of this.areas) {
            this.imageMap.appendChild(this._createAreaElement(area));
        }
    }

    /**
     * Create single area element from object.
     * @param obj
     * @returns {HTMLAreaElement}
     * @private
     */
    _createAreaElement(obj) {
        let el = document.createElement('area');

        for (let key of Object.keys(obj.attributes)) {
            el[key] = obj.attributes[key];
        }

        if (this.scale !== 1) {
            el.coords = this._getScaledCoords(obj);
        }

        return el;
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
                coords = [{
                    x: arrCoords[0],
                    y: arrCoords[1],
                    r: arrCoords[2],
                }]
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

    /**
     * Get scaled area coords from object.
     * @param obj
     * @returns {string}
     * @private
     */
    _getScaledCoords(obj) {
        let coords;
        let arr = [];

        switch (obj.attributes.shape) {
            case 'rect':
            case 'poly':
                for (let item of obj.coords) {
                    arr.push(Math.round(item.x * this.scale));
                    arr.push(Math.round(item.y * this.scale));
                }

                coords = arr.join(',');

                break;
            case 'circle':
                for (let item of obj.coords) {
                    arr.push(Math.round(item.x * this.scale));
                    arr.push(Math.round(item.y * this.scale));
                    arr.push(Math.round(item.r * this.scale));
                }

                coords = arr.join(',');

                break;
            default:
                coords = obj.attributes.coords;
                break;
        }

        return coords;
    }

    /**
     * Get current scale factor of image map.
     * @returns {number}
     * @private
     */
    _getScale() {
        return this.image.width / this.image.naturalWidth;
    }
}

export default UsefulImageMap;

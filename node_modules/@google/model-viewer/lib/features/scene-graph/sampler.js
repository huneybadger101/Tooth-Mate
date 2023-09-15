/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Vector2 } from 'three';
import { Filter, Wrap } from '../../three-components/gltf-instance/gltf-2.0.js';
import { $correlatedObjects, $onUpdate, ThreeDOMElement } from './three-dom-element.js';
const isMinFilter = (() => {
    const minFilterValues = [
        Filter.Nearest,
        Filter.Linear,
        Filter.NearestMipmapNearest,
        Filter.LinearMipmapLinear,
        Filter.NearestMipmapLinear,
        Filter.LinearMipmapLinear
    ];
    return (value) => minFilterValues.indexOf(value) > -1;
})();
const isMagFilter = (() => {
    const magFilterValues = [Filter.Nearest, Filter.Linear];
    return (value) => magFilterValues.indexOf(value) > -1;
})();
const isWrapMode = (() => {
    const wrapModes = [Wrap.ClampToEdge, Wrap.MirroredRepeat, Wrap.Repeat];
    return (value) => wrapModes.indexOf(value) > -1;
})();
const isValidSamplerValue = (property, value) => {
    switch (property) {
        case 'minFilter':
            return isMinFilter(value);
        case 'magFilter':
            return isMagFilter(value);
        case 'wrapS':
        case 'wrapT':
            return isWrapMode(value);
        case 'rotation':
        case 'repeat':
        case 'offset':
            return true;
        default:
            throw new Error(`Cannot configure property "${property}" on Sampler`);
    }
};
const $threeTexture = Symbol('threeTexture');
const $threeTextures = Symbol('threeTextures');
const $setProperty = Symbol('setProperty');
/**
 * Sampler facade implementation for Three.js textures
 */
export class Sampler extends ThreeDOMElement {
    get [$threeTexture]() {
        var _a;
        return (_a = this[$correlatedObjects]) === null || _a === void 0 ? void 0 : _a.values().next().value;
    }
    get [$threeTextures]() {
        return this[$correlatedObjects];
    }
    constructor(onUpdate, texture) {
        super(onUpdate, new Set(texture ? [texture] : []));
    }
    get name() {
        return this[$threeTexture].name || '';
    }
    get minFilter() {
        return this[$threeTexture].minFilter;
    }
    get magFilter() {
        return this[$threeTexture].magFilter;
    }
    get wrapS() {
        return this[$threeTexture].wrapS;
    }
    get wrapT() {
        return this[$threeTexture].wrapT;
    }
    get rotation() {
        return this[$threeTexture].rotation;
    }
    get scale() {
        return this[$threeTexture].repeat;
    }
    get offset() {
        return this[$threeTexture].offset;
    }
    setMinFilter(filter) {
        this[$setProperty]('minFilter', filter);
    }
    setMagFilter(filter) {
        this[$setProperty]('magFilter', filter);
    }
    setWrapS(mode) {
        this[$setProperty]('wrapS', mode);
    }
    setWrapT(mode) {
        this[$setProperty]('wrapT', mode);
    }
    setRotation(rotation) {
        if (rotation == null) {
            // Reset rotation.
            rotation = 0;
        }
        this[$setProperty]('rotation', rotation);
    }
    setScale(scale) {
        if (scale == null) {
            // Reset scale.
            scale = new Vector2(1, 1);
        }
        this[$setProperty]('repeat', scale);
    }
    setOffset(offset) {
        if (offset == null) {
            // Reset offset.
            offset = new Vector2(0, 0);
        }
        this[$setProperty]('offset', offset);
    }
    [$setProperty](property, value) {
        if (isValidSamplerValue(property, value)) {
            for (const texture of this[$threeTextures]) {
                texture[property] = value;
                texture.needsUpdate = true;
            }
        }
        this[$onUpdate]();
    }
}
//# sourceMappingURL=sampler.js.map
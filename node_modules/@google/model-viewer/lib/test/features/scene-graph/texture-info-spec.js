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
import { expect } from '@esm-bundle/chai';
import { Vector2 } from 'three';
import { ModelViewerElement } from '../../../model-viewer.js';
import { waitForEvent } from '../../../utilities.js';
import { assetPath } from '../../helpers.js';
const DUCK_GLB_PATH = assetPath('models/glTF-Sample-Models/2.0/Duck/glTF-Binary/Duck.glb');
const TEXTURED_CUBE_GLB_PATH = assetPath('models/glTF-Sample-Models/2.0/BoxTextured/glTF-Binary/BoxTextured.glb');
suite('scene-graph/texture-info', () => {
    suite('texture-info', () => {
        let element;
        let emptyTextureInfo;
        let baseTextureInfo;
        setup(async () => {
            element = new ModelViewerElement();
            element.src = DUCK_GLB_PATH;
            document.body.insertBefore(element, document.body.firstChild);
            await waitForEvent(element, 'load');
            emptyTextureInfo = element.model.materials[0].normalTexture;
            baseTextureInfo =
                element.model.materials[0].pbrMetallicRoughness.baseColorTexture;
        });
        teardown(() => {
            document.body.removeChild(element);
        });
        test('empty slot is null', async () => {
            // The duck doesn't have a normal texture.
            expect(emptyTextureInfo.texture).to.be.null;
        });
        test('non-empty slot is not null', async () => {
            // The duck doesn't have a normal texture.
            expect(baseTextureInfo.texture).to.not.be.null;
        });
        test('call setTexture', async () => {
            const texture = await element.createTexture(assetPath('models/glTF-Sample-Models/2.0/BoxTextured/glTF/CesiumLogoFlat.png'));
            // Setting a texture, the normal texture should _not_ be null.
            emptyTextureInfo.setTexture(texture);
            expect(emptyTextureInfo.texture).to.not.be.null;
            // Clearing a texture, the normal texture _should_ be null again.
            emptyTextureInfo.setTexture(null);
            expect(emptyTextureInfo.texture).to.be.null;
        });
        test('exports and re-imports the model with transformed texture', async () => {
            var _a, _b, _c, _d;
            // Load textured glb.
            element.src = TEXTURED_CUBE_GLB_PATH;
            await waitForEvent(element, 'load');
            // Transform the textures.
            const sampler = (_b = (_a = element.model) === null || _a === void 0 ? void 0 : _a.materials[0].pbrMetallicRoughness['baseColorTexture'].texture) === null || _b === void 0 ? void 0 : _b.sampler;
            sampler.setRotation(0.1);
            sampler.setOffset(new Vector2(0.2, 0.3));
            sampler.setScale(new Vector2(0.4, 0.5));
            // Export model.
            const exported = await element.exportScene({ binary: true });
            const url = URL.createObjectURL(exported);
            // Re-load model.
            element.src = url;
            await waitForEvent(element, 'load');
            URL.revokeObjectURL(url);
            const exported_sampler = (_d = (_c = element.model) === null || _c === void 0 ? void 0 : _c.materials[0].pbrMetallicRoughness['baseColorTexture'].texture) === null || _d === void 0 ? void 0 : _d.sampler;
            expect(exported_sampler.rotation).to.be.eq(0.1, 'rotation');
            expect(exported_sampler.offset)
                .to.be.eql(new Vector2(0.2, 0.3), 'offset');
            expect(exported_sampler.scale)
                .to.be.eql(new Vector2(0.4, 0.5), 'scale');
        });
    });
});
//# sourceMappingURL=texture-info-spec.js.map
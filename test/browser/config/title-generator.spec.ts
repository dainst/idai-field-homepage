/**
 */
import {TitleGenerator} from "../../../app/title-generator";

export function main() {

    describe('TitleGenerator', () => {

        it('should do stuff', ()=> {

            expect(TitleGenerator.resolveProjectName('monte-turcisi-project')).toEqual('Monte Turcisi');
        });
    })
}

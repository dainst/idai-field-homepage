/**
 * @author Philipp Gerth
 */
export class TitleGenerator {

    public static resolveProjectName(identifier: any) {

        const projectName = identifier.replace("-project", "").replace("-", " ");
        return TitleGenerator.convertToTitle(projectName);
    }


    private static convertToTitle(string: string) {

        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}
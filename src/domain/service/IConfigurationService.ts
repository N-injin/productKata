import {ApplicationConfigurationInterface} from "../configuration/ApplicationConfigurationInterface";

export default interface IConfigurationService {
    getConfiguration(): ApplicationConfigurationInterface;
}

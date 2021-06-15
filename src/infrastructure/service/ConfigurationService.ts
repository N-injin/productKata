import {ApplicationConfigurationInterface} from "../../domain/configuration/ApplicationConfigurationInterface";
import IConfigurationService from "../../domain/service/IConfigurationService";

export default class ConfigurationService implements IConfigurationService {
    private readonly _configuration: ApplicationConfigurationInterface;

    constructor(configuration: ApplicationConfigurationInterface) {
        this._configuration = configuration;
    }

    getConfiguration(): ApplicationConfigurationInterface {
        return this._configuration;
    }
}

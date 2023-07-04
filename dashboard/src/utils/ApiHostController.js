class ApiHostController {
    #localHost;
    #production;
    #cwTest;
    #cwDev;

    constructor() {
        this.#localHost = "http://localhost:44340";
        this.#production = "https://api.cleverlywork.com";
        this.#cwTest = "https://cleverlyworkmobile-test.azurewebsites.net";
        this.#cwDev = "https://cleverlyworkmobile-dev.azurewebsites.net";
    }

    getApiDomain(currentHostnamw) {
        const apiDomain = this.getApiDomainByCurrentDomain(currentHostnamw);
        return apiDomain;
    }

    getApiDomainByCurrentDomain(currentHostnamw) {
        let apiDomain;
        switch (currentHostnamw) {
            case "localhost":
                apiDomain = this.#localHost;
                break;

            case "app.cleverlywork.com":
                apiDomain = this.#production;
                break;

            case "cwork-test.azurewebsites.net":
                apiDomain = this.#cwTest;
                break;

            case "cwork-dev.azurewebsites.net":
                apiDomain = this.#cwDev;
                break;
            case "cwork-publish.azurewebsites.net":
                apiDomain = this.#cwDev;
                break;

            default:
                break;
        }

        return apiDomain;
    }
}

const apiHostController = new ApiHostController();

export { apiHostController };

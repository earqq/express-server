import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



(async () => {
    console.log('Starting server...');
    mainModule();
})();

function mainModule() {

    const server = new Server({
        PORT: envs.PORT,
        PUBLIC_PATH: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });

    server.start();

}
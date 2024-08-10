import propertyRoute from "./api/v1/property.route.js";
import authRoute from "./api/v1/auth.route.js";
import testRoute from "./api/v1/test.route.js";
import userRoute from "./api/v1/user.route.js";
import fileRoute from "./api/v1/file.route.js";
import branchRoute from "./api/v1/branch.route.js";
import landlordRoute from "./api/v1/landlord.route.js";

const routes = [];

routes.push(propertyRoute);
routes.push(authRoute);
//routes.push(testRoute);
routes.push(userRoute);
routes.push(fileRoute);
routes.push(branchRoute);
routes.push(landlordRoute);

export default routes;
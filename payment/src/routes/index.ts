import { Express } from "express"
import { authorizator, handleException } from "@ticket-app/common"
import { ChargeEndpointFactory } from "../factories/charge-endpoint-factory";
import ChargeEndpoint from "../endpoints/charge";

const chargeEndpoint: ChargeEndpoint = new ChargeEndpointFactory().make({})

export default (app: Express) => {

    app.post("/api/charges", authorizator, chargeEndpoint.charge);
    
    app.use(handleException)
   
}
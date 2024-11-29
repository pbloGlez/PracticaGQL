import { Flight, FlightModel } from "./types.ts";

export const fromModelToFlight = (flightModel : FlightModel): Flight => {
    return {
        id: flightModel._id!.toString(),
        origen : flightModel.origen,
        destino : flightModel.destino,
        fechaHora : flightModel.fechaHora
    };
};
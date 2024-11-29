import { Collection, ObjectId } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { fromModelToFlight } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      __: unknown,
      context: { FlightCollection: Collection<FlightModel> },
    ): Promise<Flight[]> => {
      const flightModel = await context.FlightCollection.find().toArray();
      return flightModel.map((flightModel) =>
        fromModelToFlight(flightModel)
      );
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        FlightCollection: Collection<FlightModel>;
      },
    ): Promise<Flight | null> => {
      const flightModel = await context.FlightCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!flightModel) {
        return null;
      }
      return fromModelToFlight(flightModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string; fechaHora: string },
      context: {
        FlightCollection: Collection<FlightModel>;
      },
    ): Promise<Flight> => {
      const { origen, destino, fechaHora } = args;
      const { insertedId } = await context.FlightCollection.insertOne({
        origen,
        destino,
        fechaHora

      });
      const flightModel = {
        _id: insertedId,
        origen,
        destino,
        fechaHora
      };
      return fromModelToFlight(flightModel!);
    },
  },
};
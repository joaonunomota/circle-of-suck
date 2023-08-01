import type Edge from "./Edge";

export default interface Graph extends Record<number, Record<number, Edge>> {}

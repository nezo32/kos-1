import type { Plans } from "@/types/directus";
import type { KTableTypes } from "@kosygin-rsu/components";

export const columnMapper: KTableTypes.TableColumnMapper<Plans> | undefined = (el, col) => {
  if (col.field != "faculty") return col.mapped;
  return "";
};

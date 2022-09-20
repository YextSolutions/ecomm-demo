import * as React from "react";
import { v4 as uuid } from "uuid";

interface DetailTableProps {
  details: Record<string, string | undefined>;
}

const DetailTable = ({ details }: DetailTableProps) => {
  return (
    <table className="w-full table-auto">
      <tbody>
        {Object.entries(details)
          .filter(([_key, value]) => value)
          .map(([key, value]) => (
            <tr key={uuid()}>
              <td className="border border-black bg-gray-200 pl-3 font-bold">
                {key}
              </td>
              <td className="border border-black pl-3">{value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DetailTable;

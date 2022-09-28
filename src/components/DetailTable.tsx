import * as React from "react";
import { v4 as uuid } from "uuid";

interface DetailTableProps {
  details: { key: string; value: string }[];
}

const DetailTable = ({ details }: DetailTableProps) => {
  return (
    <table className="w-full table-auto">
      <tbody>
        {details.map((detail) => (
          <tr key={uuid()}>
            <td className="border border-black bg-gray-200 pl-3 font-bold">
              {detail.key}
            </td>
            <td className="border border-black pl-3">{detail.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailTable;

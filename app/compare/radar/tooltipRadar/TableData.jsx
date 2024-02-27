export default function TableData({ data, type = "vertical" }) {
  let keys = Object.keys(data);
  let values = Object.values(data);

  // Vertical product view
  if (type == "vertical") {
    return (
      <table className="border-collapse table-auto w-full text-sm border border-slate-300">
        <thead className="bg-slate-100">
          <tr className="">
            <th className="p-2">Product</th>
            <th className="p-2 px-5">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {keys.map((param, i) => {
            if (i > 0) {
              return (
                <tr
                  key={i}
                  className="border-b border-l border-slate-300  text-slate-500 "
                >
                  <td className="p-2 border-r border-slate-300">{param}</td>
                  {values.map((param1, j) => {
                    if (j > 0) {
                      if (j == i) {
                        return (
                          <td className="p-2 border-r border-slate-300" key={j}>
                            {param1}
                          </td>
                        );
                      }
                    }
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  }

  // Horizontal product view
  if (type == "horizontal") {
    return (
      <table className="border-collapse table-auto w-full text-sm border border-slate-300">
        <tbody className="bg-white ">
          <tr>
            {keys.map((param, i) => {
              if (i > 0) {
                return (
                  <td
                    key={i}
                    className="border-b border-l border-slate-300  p-4 pl-8 text-slate-500 "
                  >
                    {param}
                  </td>
                );
              }
            })}
          </tr>
          <tr>
            {values.map((param, i) => {
              if (i > 0) {
                return (
                  <td
                    key={i}
                    className="border-b border-l border-slate-300  p-4 pl-8 text-slate-500 "
                  >
                    {param}
                  </td>
                );
              }
            })}
          </tr>
        </tbody>
      </table>
    );
  }
}

import TableData from "../tooltipRadar/TableData";

export default function TooltipParams({ data }) {
  return (
    <section className="bg-white overflow-hidden  text-sm">
      <section className="bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]  ">
        <TableData data={data} type="vertical" />
      </section>
    </section>
  );
}

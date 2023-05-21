import { ResponsiveContainer, LineChart, XAxis, Line, Tooltip, CartesianGrid } from "recharts";
import chartStyleModule from './chart.module.scss';

interface Props {
    title: string;
    data: Record<string, number | string>[];
    dataKey: string;
    grid: boolean;
}

const Chart = ({title, data, dataKey, grid } : Props) => (
        <div className={`${chartStyleModule.chart} widget`}>
            <h3 className="chartTitle">{ title }</h3>
            <ResponsiveContainer width="100%" aspect={4/1} minWidth={1000}>
                <LineChart width={400} height={100} data={data}>
                    <XAxis dataKey="name" stroke="var(--primary-color)" />
                    <Line type="monotone" dataKey={dataKey} stroke="var(--primary-color)" />
                    <Tooltip contentStyle={{ background: 'var(--bg-white)' }}/>
                    { grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" /> }
                </LineChart>
            </ResponsiveContainer>
        </div>
    )

export default Chart;
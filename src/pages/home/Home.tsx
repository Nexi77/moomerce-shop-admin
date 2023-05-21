import Chart from "@/components/chart/Chart";

const userData: Record<string, number | string>[] = []

const Home = () => (
    <div className="home">
        { userData.length > 0 && <Chart data={userData} dataKey="activeUser" grid title="User Analytics" /> }
    </div>
)

export default Home;
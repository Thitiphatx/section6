import DashboardSidebar from "./components/dashboard_sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	return (
		<div className="flex h-screen">
			<DashboardSidebar/>
			<div className="flex-1">
				{children}
			</div>
		</div>
	);
}
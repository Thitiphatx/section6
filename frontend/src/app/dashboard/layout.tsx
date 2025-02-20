import DashboardSidebar from "./components/dashboard_sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	return (
		<div className="flex min-h-screen pt-20">
			<DashboardSidebar/>
			<div className="flex-1">
				{children}
			</div>
		</div>
	);
}
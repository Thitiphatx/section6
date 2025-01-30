"use client"
import { TieredMenu } from "primereact/tieredmenu"

export default function Navbar() {
	const items = [
		{
			label: 'Import',
			icon: 'pi pi-file-import',
			url: '/backend/import'
		},
		{
			label: 'Resource',
			icon: 'pi pi-file-import',
			url: '/backend/resources'
		},
		{
			label: 'Segmentation',
			icon: 'pi pi-file-import',
			url: '/backend/segmentation'
		},
	]
	return (
		<div>
			<TieredMenu model={items}/>
		</div>
	)
}

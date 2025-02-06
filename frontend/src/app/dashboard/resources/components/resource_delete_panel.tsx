"use client"

import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"
import { useRef } from "react"
import { DeleteResource } from "../utils/delete_resource"
import { useResourceContext } from "../[resourceId]/context"

export default function ResourceDeletePanel() {
    const data = useResourceContext();
    const toast = useRef<Toast>(null);
    const accept = async () => {
        
        try {
            await DeleteResource(data.id);
            toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        } catch (error) {

        }
    }

    const confirm = () => {
        confirmDialog({
            message: 'Do you want to delete this resource? Segmented image will still exist.',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept
        });
    };
    return (
        <Card>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button severity="danger" outlined onClick={confirm} icon="pi pi-times" label="Delete"></Button>
            </div>
        </Card>
    )
}

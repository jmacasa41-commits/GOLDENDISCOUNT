import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

interface ManualLocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLocationSet?: () => void;
}

export function ManualLocationDialog({ open, onOpenChange, onLocationSet }: ManualLocationDialogProps) {
    const { setLocation } = useLocation();
    const [manualAddress, setManualAddress] = useState("");

    const handleManualSubmit = () => {
        if (manualAddress.trim()) {
            // Mock coordinates for manual entry (using Manila as default center)
            setLocation({
                lat: 14.5995,
                lng: 120.9842,
                address: manualAddress
            });
            onOpenChange(false);
            onLocationSet?.();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter Location</DialogTitle>
                    <DialogDescription>
                        Please enter your city, province, or address to find discounts near you.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="address">Address / City</Label>
                        <Input
                            id="address"
                            placeholder="e.g. Manila, Philippines"
                            value={manualAddress}
                            onChange={(e) => setManualAddress(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleManualSubmit}>Save Location</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

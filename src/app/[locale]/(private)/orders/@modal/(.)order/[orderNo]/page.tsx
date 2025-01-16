"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="">
        <DialogTitle>Order Detail</DialogTitle>
        {params.orderNo}
      </DialogContent>
    </Dialog>
  );
}

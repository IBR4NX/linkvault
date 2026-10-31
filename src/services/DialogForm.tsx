"use client";
import { ComponentProps, ReactNode } from "react";
// import { useTransition, animated, config } from "@react-spring/web";
import Form, { FormProps } from "./form";
const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface Props extends FormProps {
  children?: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  props?: ComponentProps<typeof Dialog>;
}

export function DialogForm({
  open,
  setOpen,
  onOpenChange,
  method = "PUT",
  fields,
  url,
  Submit,
  loading = false,
  children = <></>,
  ...props
}: Props) {
  // const transitions = useTransition(open, {
  //   from: { opacity: 0, transform: "scale(0.8) translateY(-100px)" },
  //   enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
  //   leave: { opacity: 0, transform: "scale(0.8) translateY(100px)" },
  //   config: config.gentle,
  // });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* {transitions((style, item) =>
          item ? ( */}
        <DialogContent>
          {/* <animated.div style={style}> */}
          <DialogHeader className="pb-2">
            <DialogTitle>تعديل المعلومات </DialogTitle>
            <DialogDescription>قم بتعديل الحقول حسب الحاجة هنا. اضغط على حفظ عند اتمام التعديلات.</DialogDescription>
          </DialogHeader>
          <Form fields={fields} Submit={Submit} method={method} url={url} />
          <DialogFooter>
            <div className=" grid grid-cols-7 gap-4 pt-2">
              <DialogClose
                className="col-span-3 "
                render={
                  <Button onClick={() => setOpen(false)} variant="outline" className="">
                    Cancel
                  </Button>
                }
              />
              <Button className="col-span-4" type="submit" form="Form" disabled={loading}>
                {loading ? "loading..." : "Submit"}
              </Button>
            </div>
          </DialogFooter>
          {/* </animated.div> */}
        </DialogContent>
        {/* ) : null,
        )} */}
      </Dialog>
    </>
  );
}

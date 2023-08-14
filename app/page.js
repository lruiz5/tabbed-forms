import { Separator } from "@/components/ui/separator";
import { TabList } from "@/app/primary-form";

export default function PageOne() {
  return (
    <div className="space-y-6">
      {/* <div>
        <h3 className="text-lg font-medium">Page One</h3>
        <p className="text-sm text-muted-foreground">
          This is page one of the Maintenance & Safety Inspection.
        </p>
      </div>
      <Separator /> */}
      <TabList />
    </div>
  );
}

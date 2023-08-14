import { Separator } from "@/components/ui/separator"
import { OtherForm } from "@/app/other/other-form"

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Other</h3>
        <p className="text-sm text-muted-foreground">
          All questions classified as "Other" can be found here.
        </p>
      </div>
      <Separator />
      <OtherForm />
    </div>
  )
}
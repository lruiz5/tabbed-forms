"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import {
  primary,
  quarternary,
  secondary,
  tertiary,
} from "@/constants/questions";
import * as z from "zod";
import { vehicles } from "@/constants/vehicles";
import { inspectors } from "@/constants/inspectors";
import { months } from "@/constants/months";
import { Input } from "@/components/ui/input";
import { DEFAULT_VALUES } from "@/constants/defaultForm";

const DEFAULT_VEHICLE = {
  id: "",
  unitNum: "",
};
const DEFAULT_INSPECTOR = {
  id: "",
  name: "",
};
const DEFAULT_MONTH = {
  id: new Date().toLocaleString("default", { month: "numeric" }).toString(),
  name: new Date().toLocaleString("default", { month: "long" }),
};

const formSchema = z.object({
  month: z
    .string()
    .default(
      new Date().toLocaleString("default", { month: "numeric" }).toString()
    ),
  inspectorId: z.string().optional(),
  vehicleId: z.string().optional(),
  mileage: z
    .string()
    .max(7, { message: "Mileage cannot be longer than 7 characters" }),
  fireExtinguisher: z.string().optional(),
  hornDefroster: z.string().optional(),
  mirrorsAnd: z.string().optional(),
  windshieldWipers: z.string().optional(),
  allLights: z.string().optional(),
  electricalWiring: z.string().optional(),
  batteriesWater: z.string().optional(),
  warningDevices: z.string().optional(),
  radiatorAnd: z.string().optional(),
  beltsCompressors: z.string().optional(),
  airHoses: z.string().optional(),
  fuelSystem: z.string().optional(),
  exhaustSystem: z.string().optional(),
  engineMounting: z.string().optional(),
  clutchAdjustment: z.string().optional(),
  airFilter: z.string().optional(),
  startingAnd: z.string().optional(),
  tractorProtection: z.string().optional(),
  hydraulicBrake: z.string().optional(),
  hydraulicMaster: z.string().optional(),
  hosesAnd: z.string().optional(),
  airBrake: z.string().optional(),
  minuteTest: z.string().optional(),
  airCompressor: z.string().optional(),
  primaryAir: z.string().optional(),
  otherAir: z.string().optional(),
  tiresTread: z.string().optional(),
  wheelsLugnuts: z.string().optional(),
  parkingBrake: z.string().optional(),
  emergencyStopping: z.string().optional(),
  brakesRelease: z.string().optional(),
  steeringSystem: z.string().optional(),
  steeringArms: z.string().optional(),
  connectingDevices: z.string().optional(),
  suspensionSystem: z.string().optional(),
  frameAnd: z.string().optional(),
  driveShaft: z.string().optional(),
  transmissionAnd: z.string().optional(),
  wheelSeals: z.string().optional(),
  underCarriage: z.string().optional(),
});

export function TabList() {
  const [activeTab, setActiveTab] = useState("first");
  const [selectedVehicle, setSelectedVehicle] = useState(DEFAULT_VEHICLE);
  const [selectedInspector, setSelectedInspector] = useState(DEFAULT_INSPECTOR);
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const handleBulkUpdate = (questionSet) => {
    questionSet.map((question) => {
      form.setValue(question.name, "OK");
    });
  };

  const onSubmit = async (data) => {
    data.inspectorId = selectedInspector.id;
    data.vehicleId = selectedVehicle.id;
    data.month = selectedMonth.id;

    try {
      const response = await fetch("/api/inspections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Handle success
        toast({
          title: "Data submitted successfully",
        });
        setActiveTab("first");
        form.reset((formValues) => DEFAULT_VALUES);
        setSelectedVehicle(DEFAULT_VEHICLE);
        setSelectedInspector(DEFAULT_INSPECTOR);
        setSelectedMonth(DEFAULT_MONTH);
      } else {
        // Handle error
        toast({
          title: "Failed to submit data.",
        });
      }
    } catch (error) {
      toast({
        title: `Failed to submit data: ${error}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-row">
          <FormItem className="flex flex-col mr-4">
            <FormLabel>Month</FormLabel>
            <Combobox
              dataType="month"
              items={months}
              selectedItem={selectedMonth}
              setSelectedItem={(month) => setSelectedMonth(month)}
            />
          </FormItem>
          <FormItem className="flex flex-col mr-4">
            <FormLabel>Inspector</FormLabel>
            <Combobox
              dataType="inspector"
              items={inspectors}
              selectedItem={selectedInspector}
              setSelectedItem={(inspector) => setSelectedInspector(inspector)}
            />
          </FormItem>
          <FormItem className="flex flex-col mr-4">
            <FormLabel>Vehicle</FormLabel>
            <Combobox
              dataType="vehicle"
              items={vehicles}
              selectedItem={selectedVehicle}
              setSelectedItem={(vehicle) => setSelectedVehicle(vehicle)}
            />
          </FormItem>
          <FormField
            control={form.control}
            name={"mileage"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input
                    onValueChange={(e) => setCurrentMileage(e.target.value)}
                    defaultValue={form.mileage}
                    placeholder="mileage"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Tabs defaultValue={activeTab} value={activeTab} className="w-[650px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="first" onClick={() => setActiveTab("first")}>
              1-10
            </TabsTrigger>
            <TabsTrigger value="second" onClick={() => setActiveTab("second")}>
              11-20
            </TabsTrigger>
            <TabsTrigger value="third" onClick={() => setActiveTab("third")}>
              21-30
            </TabsTrigger>
            <TabsTrigger value="fourth" onClick={() => setActiveTab("fourth")}>
              31-40
            </TabsTrigger>
          </TabsList>
          <TabsContent value="first">
            <Card className="pt-2">
              <CardContent className="space-y-2.5">
                {primary.map((question) => (
                  <FormField
                    key={question.name}
                    control={form.control}
                    name={question.name}
                    {...form.register(question.name)}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {question.id}. {question.question}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="OK" />
                              </FormControl>
                              <FormLabel className="font-normal">OK</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="DEF" />
                              </FormControl>
                              <FormLabel className="font-normal">DEF</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="mr-96"
                  onClick={() => handleBulkUpdate(primary)}
                >
                  Select All
                </Button>
                <Button onClick={() => setActiveTab("second")}>
                  Next Page
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="second">
            <Card>
              <CardContent className="space-y-2">
                {secondary.map((question) => (
                  <FormField
                    key={question.name}
                    control={form.control}
                    name={question.name}
                    {...form.register(question.name)}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {question.id}. {question.question}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="OK" />
                              </FormControl>
                              <FormLabel className="font-normal">OK</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="DEF" />
                              </FormControl>
                              <FormLabel className="font-normal">DEF</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="mr-96"
                  onClick={() => handleBulkUpdate(secondary)}
                >
                  Select All
                </Button>
                <Button onClick={() => setActiveTab("third")}>Next Page</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="third">
            <Card>
              <CardContent className="space-y-2">
                {tertiary.map((question, index) => (
                  <FormField
                    key={question.name}
                    control={form.control}
                    name={question.name}
                    {...form.register(question.name)}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {question.id}. {question.question}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="OK" />
                              </FormControl>
                              <FormLabel className="font-normal">OK</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="DEF" />
                              </FormControl>
                              <FormLabel className="font-normal">DEF</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="mr-96"
                  onClick={() => handleBulkUpdate(tertiary)}
                >
                  Select All
                </Button>
                <Button onClick={() => setActiveTab("fourth")}>
                  Next Page
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="fourth">
            <Card>
              <CardContent className="space-y-2">
                {quarternary.map((question) => (
                  <FormField
                    key={question.name}
                    control={form.control}
                    name={question.name}
                    {...form.register(question.name)}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {question.id}. {question.question}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="OK" />
                              </FormControl>
                              <FormLabel className="font-normal">OK</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="DEF" />
                              </FormControl>
                              <FormLabel className="font-normal">DEF</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="mr-96"
                  onClick={() => handleBulkUpdate(quarternary)}
                >
                  Select All
                </Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

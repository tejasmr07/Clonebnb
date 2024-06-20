"use client";

import { useMemo, useState } from "react";

import useRentModel from "@/app/hooks/useRentModel";

import Model from "./Model";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUploads from "../inputs/ImageUploads";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModel = () => {
  const rentModel = useRentModel();

  const [step, setstep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setstep((value) => value - 1);
  };

  const onNext = () => {
    setstep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place"
        subtite="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located ?"
          subtitle="Help guests find you !"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="what amenities do you have"
        />
        <hr />
        <Counter
          title="Guests"
          subtitle="How many guests will you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step == STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUploads />
      </div>
    );
  }

  return (
    <Model
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title="Clonebnb your Home"
      body={bodyContent}
    />
  );
};
export default RentModel;

import { Story } from "@/features/story/ui/story";
import { JSX } from "react";

export const StoriesList = (): JSX.Element => {
  const storiesLength = 7;

  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto px-4">
      <div className="flex justify-start space-x-4">
        {[...Array(storiesLength)].map((_, index) => (
          <Story key={index} index={index}/>
        ))}
      </div>
    </div>
  )
}

import React, { JSX } from "react";

export const Story = ({ index }: { index: number }): JSX.Element => {
  return (
          <div
            key={index}
            className="
                      flex-shrink-0
                      w-24 h-36         /* на самых маленьких — 24×36 */
                      sm:w-28 sm:h-40   /* на sm — 28×40 */
                      md:w-32 md:h-48   /* на md+ — 32×48 */
                      bg-gray-300 rounded-lg
                    "
          />
  )
}

import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Menu } from "@/shared/ui/icons/menu";
import { Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { useState } from "react";

export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-2 right-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" w-8 h-8">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem asChild>
            <Button asChild variant="ghost" className="cursor-pointer">
              <Link
                href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
                className="font-medium flex gap-4"
              >
                <Pencil />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

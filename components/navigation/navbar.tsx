import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useDisclosure, useMobileDesktop } from "../hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

import { navigationConfig } from "./navigation-config";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationChildItem,
} from "@/components/ui/navigation-menu";

const DesktopNavbar = () => (
  <NavigationMenu>
    <NavigationMenuList>
      {navigationConfig.map((item) => (
        <NavigationMenuItem key={item.href}>
          {item.children && item.children.length > 0 ? (
            <>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {item.children.map((child) => (
                    <Link href={child.href} key={child.href}>
                      <NavigationChildItem title={child.label}>
                        {child.description}
                      </NavigationChildItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileNavbar = () => {
  const { isOpen, setIsOpen } = useDisclosure();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Nexeth</SheetTitle>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col items-start content-start">
            {navigationConfig.map((item) =>
              item.children && item.children.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  key={item.href}
                  className="w-full"
                >
                  <AccordionItem value={item.href} dir="rtl">
                    <AccordionTrigger>{item.label}</AccordionTrigger>
                    <AccordionContent>
                      {[item, ...item.children].map((child) => (
                        <NavigationMenuItem key={child.href} className="">
                          <Link href={child.href} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              {child.label}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <NavigationMenuItem key={item.href} className="">
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};

export const Navbar = () =>
  useMobileDesktop(<MobileNavbar />, <DesktopNavbar />);

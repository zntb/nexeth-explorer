import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Cross2Icon, GearIcon } from "@radix-ui/react-icons";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDisclosure, useSession } from "../hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

import { useUsernameExists } from "./use-username-exists";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { shortenString } from "@/lib";
import { UpdateUserRequest, trpc, updateUserRequestSchema } from "@/server";

export const ProfileModal = () => {
  const { setIsOpen, isOpen, onOpen } = useDisclosure();
  const address = useAddress();
  const { isConnected, isSignedUp, isLoading, user } = useSession();
  const onDisconnect = useDisconnect();

  const form = useForm<UpdateUserRequest>({
    resolver: zodResolver(updateUserRequestSchema),
    defaultValues: {
      username: isSignedUp ? user?.username : "",
    },
  });
  const username = form.watch("username");
  const { allowUpdate, isLoadingUsername } = useUsernameExists(
    username,
    !!address && (isOpen || !isSignedUp)
  );
  const { mutateAsync } = trpc.user.editProfile.useMutation();

  const onSubmit = async (data: UpdateUserRequest) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (error: any) => {
    console.error(error);
  };

  useEffect(() => {
    if (!!username && !allowUpdate) {
      form.setError("username", { message: "Username already exists" });
    } else {
      form.clearErrors("username");
    }
  }, [allowUpdate, form, username]);

  useEffect(() => {
    if (isSignedUp && user?.username) {
      form.setValue("username", user?.username);
    }
  }, [isSignedUp, user?.username, form]);

  if (!address) return null;

  return (
    <>
      <Button size="icon" variant="outline" onClick={onOpen}>
        <GearIcon />
      </Button>
      <Dialog
        open={isOpen || (!isLoading && isConnected && !isSignedUp)}
        onOpenChange={setIsOpen}
      >
        <Form {...form}>
          <DialogContent
            className="sm:max-w-[425px]"
            hideCloseButton={!isSignedUp}
          >
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              {isSignedUp ? (
                <DialogHeader className="pb-4">
                  <DialogTitle>Profile</DialogTitle>
                  <DialogDescription>Update your profile.</DialogDescription>
                </DialogHeader>
              ) : (
                <DialogHeader className="pb-4">
                  <DialogTitle>Welcome</DialogTitle>
                  <DialogDescription>
                    Complete your profile to get started.
                  </DialogDescription>
                </DialogHeader>
              )}

              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <div className="flex flex-row gap-2 items-center">
                  <FormControl>
                    <Input disabled value={shortenString(address, 10, 10)} />
                  </FormControl>
                  {!isSignedUp && (
                    <Button onClick={onDisconnect}>Disconnect</Button>
                  )}
                </div>
                <FormDescription>
                  This is your public address.{" "}
                  {!isSignedUp && "Ensure this is the correct wallet."}
                </FormDescription>
              </FormItem>

              <Separator className="my-4" />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <div className="flex flex-row gap-2 items-center">
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <div className="w-3">
                        {isLoadingUsername ? (
                          <Spinner size={3} />
                        ) : allowUpdate && !form.formState.errors.username ? (
                          <CheckIcon />
                        ) : (
                          <Cross2Icon />
                        )}
                      </div>
                    </div>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  disabled={isLoadingUsername || !allowUpdate}
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>
    </>
  );
};

export default ProfileModal;

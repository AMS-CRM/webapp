import React from "react";
import { Text, Group, Loader } from "@mantine/core";
import { IconCloudSnow } from "@tabler/icons";

export default function SavingStatus({ status }) {
  return (
    <>
      {status ? (
        <Group position="center" display="inline">
          <IconCloudSnow
            size="20"
            style={{ top: "3px", position: "relative" }}
          />
          <Text display="inline" ml="5px">
            Saved
          </Text>
        </Group>
      ) : (
        <Group display="inline">
          <Loader size="20" style={{ top: "3px", position: "relative" }} />
          <Text display="inline">Saving...</Text>
        </Group>
      )}
    </>
  );
}

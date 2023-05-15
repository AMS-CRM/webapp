import { Skeleton } from "@mantine/core";

const PayrollViewSkelenton = () => {
  return (
    <>
      <Skeleton height={50} width={200} radius="xl" />
      <Skeleton height={30} width={100} mt={6} radius="xl" />
      <Skeleton
        height={100}
        width={200}
        mt={40}
        radius="md"
        mr="20px"
        style={{ float: "left" }}
      />
      <Skeleton
        height={100}
        width={200}
        mt={40}
        radius="md"
        mr="20px"
        style={{ float: "left" }}
      />
      <Skeleton
        height={100}
        width={200}
        mt={40}
        radius="md"
        mr="20px"
        style={{ float: "left" }}
      />
      <Skeleton height={50} width="100%" mt={160} radius="xl" />
    </>
  );
};

export default PayrollViewSkelenton;

import axios from "axios";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "./FormContainer";
import Label from "./Label";

type ScanInputs = {
  Status: string;
  RepositoryName: string;
};
type FindingInputs = {
  type: string;
  ruleId: string;
  path: string;
  line: number;
  description: string;
  severity: string;
};

export const API_URL = "http://localhost:4001/api";

const SubmitScanResult = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [findings, setFindings] = useState<FindingInputs[]>([]);
  const {
    register: registerScan,
    handleSubmit: handleSubmitScan,
    watch: watchScan,
    reset: resetScan,
    formState: { errors: errorsScan },
  } = useForm<ScanInputs>();

  const {
    register: registerFinding,
    handleSubmit: handleSubmitFinding,
    reset: resetFinding,
    watch: watchFinding,
    formState: { errors: errorsFinding },
  } = useForm<FindingInputs>();

  const toast = useToast()

  const onSubmitScan: SubmitHandler<ScanInputs> = async (data) => {
    if (findings?.length > 0) {
      try {
        await axios.post(`${API_URL}/result/create`, {
          ...data,
          findings,
        });
        toast({
            title: 'Scan submitted.',
            description: "Scan has been submitted successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        resetScan();
        setFindings([])
      } catch (error) {
        console.error(error);
        toast({
            title: 'Failed.',
            description: "Failed to submit scan.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
      }
    }
  };
  const onSubmitFinding: SubmitHandler<FindingInputs> = (data) => {
    console.log({ errorsFinding });
    setFindings((prev) => [...prev, data]);
    resetFinding();
    onClose();
  };

  return (
    <Box mx="auto" px={3} pb={3} mt="3em" w={["100%", "100%", "80%", "80%"]}>
      <form onSubmit={handleSubmitScan(onSubmitScan)}>
        <FormContainer>
          <Label>Status</Label>
          <Select
            width={'20%'}
            placeholder="Select status"
            {...registerScan("Status", { required: true })}
          >
            <option value="Queued">Queued</option>
            <option value="In Progress">In Progress</option>
            <option value="Success">Success</option>
            <option value="Failure">Failure</option>
          </Select>
        </FormContainer>
        <FormContainer>
          <Label>Repository Name</Label>
          <Input
            sx={{width: '20%'}}
            placeholder="Repository Name"
            {...registerScan("RepositoryName", { required: true })}
          />
        </FormContainer>

        <FormContainer>
          <Label>Findings</Label>
          <Box px={3} pb={3} border="1px" borderColor="gray.200">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>RuleId</Th>
                    <Th>Path</Th>
                    <Th isNumeric>Line</Th>
                    <Th>Description</Th>
                    <Th>Severity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {findings?.map((finding: FindingInputs) => {
                    return (
                      <Tr>
                        <Td>{finding.type}</Td>
                        <Td>{finding.ruleId}</Td>
                        <Td>{finding.path}</Td>
                        <Td isNumeric>{finding.line}</Td>
                        <Td>{finding.description}</Td>
                        <Td>{finding.severity}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Button mt={3} onClick={onOpen} colorScheme="teal" variant="link">
              Add Finding
            </Button>
          </Box>
        </FormContainer>

        <Button type="submit" colorScheme="teal" mt={3} variant="solid">
          Submit
        </Button>
      </form>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitFinding(onSubmitFinding)}>
            <ModalHeader>Add Finding</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormContainer>
                <Label>Type</Label>
                <Input
                  placeholder="type"
                  {...registerFinding("type", { required: true })}
                />
              </FormContainer>
              <FormContainer>
                <Label>RuleId</Label>
                <Input
                  placeholder="ruleId"
                  {...registerFinding("ruleId", { required: true })}
                />
              </FormContainer>
              <FormContainer>
                <Label>Path</Label>
                <Input
                  placeholder="path"
                  {...registerFinding("path", { required: true })}
                />
              </FormContainer>
              <FormContainer>
                <Label>Line</Label>
                <NumberInput {...registerFinding("line", { required: true })}>
                  <NumberInputField />
                </NumberInput>
              </FormContainer>
              <FormContainer>
                <Label>Description</Label>
                <Input
                  placeholder="description"
                  {...registerFinding("description", { required: true })}
                />
              </FormContainer>
              <FormContainer>
                <Label>Severity</Label>
                <Input
                  placeholder="severity"
                  {...registerFinding("severity", { required: true })}
                />
              </FormContainer>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SubmitScanResult;

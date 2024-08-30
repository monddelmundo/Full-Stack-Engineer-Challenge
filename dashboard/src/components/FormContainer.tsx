import { Box } from '@chakra-ui/react'

const FormContainer = ({children, ...otherProps}: any) => {
    return <Box mt={3} {...otherProps}>
        {children}
    </Box>
}

export default FormContainer
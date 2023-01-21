import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  const IMAGE =
    'https://unsplash.com/photos/SAYtLk2Vay4';


  
  export default function CategoryOfferDetail({Offerdetail}) {
    console.log(Offerdetail)
    return (
      <Center py={12} flexWrap='wrap' backgroundColor={'#e4e4e4'}>
        {Offerdetail.map((offer)=>
            <Box key={offer._id}
            role={'group'}
            p={6}
            mb='49px'
            mr={['0px','13px']}
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              >
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={IMAGE}
              />
            </Box>
            <Stack pt={10} align={'center'}>
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                {offer.Category}
              </Text>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {offer.offername}
              </Heading>
              <Stack direction={'row'} align={'center'}>
                <Text fontWeight={800} fontSize={'xl'}>
                  {offer.Desc}
                </Text>
              </Stack>
            </Stack>
          </Box>
        )}
      </Center>
    );
  }


  export async function getServerSideProps(context) {
    const {category,lat,long}=context.query;
    const res =await fetch(`http://localhost:3000/api/offer/allOffer?category=${category}&lat=${lat}&long=${long}`, {
    // const res =await fetch(`https://poolandsave.com/api/offer/offerdetail`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let data= await res.json()
    // console.log(data)
    return {
      props: {  Offerdetail:data }, // will be passed to the page component as props
    }
  }
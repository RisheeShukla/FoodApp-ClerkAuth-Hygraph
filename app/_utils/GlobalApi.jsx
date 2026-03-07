const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;
import { gql, request } from "graphql-request";
import { Delete } from "lucide-react";
const GetCategories=async()=>{
    const query=gql`query MyQuery {
  categories(where: {}, first: 50) {
    id
    name
    slug
    icon {
      url
    }
  }
}`
const result=await request(MASTER_URL,query)
return result;

}
const GetBusinesses=async(category)=>{
    const query=gql`query MyQuery {
  restaurents(where: {categories_some: {Category: {slug: "${category}"}}}) {
    aboutUs
    address
    slug
    workingHours
    review{
    star
    }
    id
    name
    banner {
      url
    }
    categories {
      ... on Category {
        id
        name
      }
    }
  }
}`
const result=await request(MASTER_URL,query)
return result;

}
const GetBusinessDetail=async(businessslug)=>{
  const query=gql`query MyQuery {
  restaurent(where: {slug: "${businessslug}"}) {
    aboutUs
    address
    banner {
      url
    }
      review {
      star
    }
    name
    id
    categories {
      ... on Category {
        name
      }
    }

    slug
    workingHours
    rType
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            price
            productImage {
              url
            }
             description
          }
        }
      }
    }
  }
}`
 const result=await request(MASTER_URL,query)
 return result;
}

const AddToCart=async(data)=>{
  const query=gql`mutation MyMutation {
  createUserCart(
    data: {email: "`+data?.email+`", price: `+data.price+`, productDescription: "`+data.description+`", productImage: "`+data.productImage+`", productName: "`+data.name+`",restaurent: {connect: {slug: "${data.restaurantSlug}"}}}
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result

}

const GetUserCart=async(userEmail)=>{
    const query=gql`query GetUserCart {
  userCarts(where: {email: "${userEmail}"}) {
    id
    price
    productDescription
    productImage
    productName
    restaurent
    {
    name
    banner
    {
    url
    }
    slug
    }
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const DisconnectRestroFromUserCartItem=async(id)=>{
  const query=gql`mutation DisconnectRestaurantFromCartItem {
  updateUserCart(data: {restaurent: {disconnect: true}}, where: {id: "${id}"})
  {
  id 
  }
  publishManyUserCarts(to: PUBLISHED)
  {
  count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const DeleteCartFromItem=async(id)=>{
 const query=gql`mutation DeleteCartItem {
  deleteUserCart(where: {id: "${id}"}) {
    id
  }
}`
const result=await request(MASTER_URL,query)
return result;

}
const AddNewReview=async(data)=>
{
  const query=gql`mutation AddNewReview {
  createReview(
    data: {email: "${data.email}", profileImage: "${data.profileImage}", star: ${data.star}, reviewText: "${data.reviewText}", restaurent: {connect: {slug: "${data.restaurantSlug}"}}, userName: "${data.userName}"}
  ) {
    id
  }
     publishManyReviews(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result
}
const GetRestaurantReview=async(data)=>
{
  const query=gql`query MyQuery {
  reviews(where: {restaurent: {slug: "${data}"}}) {
    id
    profileImage
    publishedAt
    userName
    star
    reviewText
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const CreateNewOrder=async(data)=>{
  const query=gql`mutation CreateNewOrder {
  createOrder(
    data: {email: "${data.email}", orderAmount: ${data.orderAmount}, restaurantName: "${data.restaurantName}", userName: "${data.userName}", zipCode: "${data.zipCode}", phone: "${data.phone}", address: "${data.address}"}
  ) 
  {
    id
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const UpdateOrderToAddOrderItems=async(name,price,id)=>{
  const query=gql`mutation UpdateOrderWithDetail {
  updateOrder(
    data: {orderDetail: {create: {OrderItem: {data: {name:"${name}", price:${price}}}}}}
    where: {id: "${id}"}
  ) {
    id
  }
  publishManyOrders(to: PUBLISHED) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}
const DeleteCart=async(userEmail)=>{
  const query=gql`mutation DeleteWholeCart {
  deleteManyUserCarts(where: {email: "${userEmail}"}) {
    count
  }
}`
const result=await request(MASTER_URL,query)
return result;
}

export default {GetCategories,GetBusinesses,GetBusinessDetail,AddToCart,GetUserCart,DisconnectRestroFromUserCartItem,
DeleteCartFromItem,AddNewReview,GetRestaurantReview,CreateNewOrder,UpdateOrderToAddOrderItems,DeleteCart
};
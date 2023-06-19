import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            {/* profile image of user */}
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`https://social-media-backend-dtu0.onrender.com/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage;
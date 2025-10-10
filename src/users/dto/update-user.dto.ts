export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  gender?: string;
  username?: string;
  isPrivate?: boolean;
  coverPhotoUrl?: string;
  bio?: string;
  location?: { city?: string; country?: string };
  dateOfBirth?: Date;
  contacts?: { email?: string; phone?: string; website?: string };
}

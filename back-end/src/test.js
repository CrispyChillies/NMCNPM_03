import bcrypt from 'bcrypt';

const password = 'mysecretpassword';

// Hash the password
bcrypt.hash(password, 10, (err, hash1) => {
  if (err) throw err;
  console.log('Hash 1:', hash1);

  // Hash the password again
  bcrypt.hash(password, 10, (err, hash2) => {
    if (err) throw err;
    console.log('Hash 2:', hash2);

    // Compare the password with the first hash
    bcrypt.compare(password, hash1, (err, isMatch) => {
      if (err) throw err;
      console.log('Password matches Hash 1:', isMatch); // true

      // Compare the password with the second hash
      bcrypt.compare(password, hash2, (err, isMatch) => {
        if (err) throw err;
        console.log('Password matches Hash 2:', isMatch); // true
      });
    });
  });
});
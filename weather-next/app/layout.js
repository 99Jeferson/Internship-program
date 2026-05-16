import ThemeRegistry from './ThemeRegistry'
import './globals.css'

export const metadata = {
  title: 'Weather App',
  description: 'Search live weather for any city in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
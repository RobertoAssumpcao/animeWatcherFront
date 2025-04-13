import './globals.css'
import Navbar from '../components/Navbar'
import { CssBaseline } from '@mui/material'

export const metadata = {
  title: 'Anime Watcher',
  description: 'Gerenciador de animes assistidos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <CssBaseline />
        {/* Condicional simples para remover navbar da Home */}
        {!children?.type?.name?.toLowerCase?.().includes('home') && <Navbar />}
        {children}
      </body>
    </html>
  )
}

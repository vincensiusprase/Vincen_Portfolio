import React, { useState, useEffect, useRef } from 'react'

// Impor otomatis isi berkas .md secara langsung menggunakan Vite ?raw import
import profileContent from '../data/profile.md?raw'
import projectsContent from '../data/projects.md?raw'
import { useLanguage } from '../context/LanguageContext.tsx'

const MAX_MONTHLY_LIMIT = 25

interface ChatMessage {
  sender: 'user' | 'bot'
  text: string
}

interface QuotaCheckResult {
  allowed: boolean
  currentUsage: number
}

// Menghapus bocoran reasoning / chain-of-thought model agar hanya jawaban akhir yang tampil
function sanitizeBotReply(text: string): string {
  if (!text) return ''
  let out = text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '')
    .replace(/Here's a thinking process:[\s\S]*?(?=\n\n|$)/gi, '')
    .replace(/Thinking process:[\s\S]*?(?=\n\n|$)/gi, '')
    .replace(/^\s*\d+\.\s*(\*\*)?Analyze User Input(\*\*)?:?[\s\S]*?(?=\n\n|$)/gim, '')
    .replace(/^\s*[-•]\s*(User asks|Language|The question is about).*$/gim, '')
    .replace(/^\s*Language:.*$/gim, '')
    .replace(/^.*system prompt's guardrails.*$/gim, '')
    .replace(/^.*WAJIB menjawab hanya dalam.*$/gim, '')
    .trim()
  return out
}

// Fungsi pembantu untuk merender teks Markdown (Bold **teks** dan *teks*) menjadi HTML
function renderFormattedMessage(text: string): React.ReactNode {
  if (!text) return null

  // Hapus bagian atribusi sumber yang tidak natural
  const cleanText = text
    .replace(/Semua penjelasan di atas bersumber dari Knowledge Base portfolio Vincensius Prasetyo Adi\.?/gi, '')
    .replace(/Berdasarkan Knowledge Base yang tersedia,?/gi, '')
    .replace(/Menurut dokumentasi portofolio ini,?/gi, '')
    .replace(/\(Source:.*?\)/gi, '')
    .trim()

  // Memecah teks berdasarkan baris
  const lines = cleanText.split('\n')

  return lines.map((line, lineIdx) => {
    // Memecah teks per baris berdasarkan pola **teks** dan *teks* (italic)
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g)
    const formattedLine = parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2)
        return (
          <strong key={index} className="font-bold text-[#3D5A80]">
            {boldText}
          </strong>
        )
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        const italicText = part.slice(1, -1)
        return (
          <em key={index} className="italic text-[#3D5A80]">
            {italicText}
          </em>
        )
      }
      return part
    })

    return (
      <React.Fragment key={lineIdx}>
        {formattedLine}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    )
  })
}

export default function Chatbot() {
  const { language, t } = useLanguage()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: t('Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!'),
    },
  ])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [remainingQuota, setRemainingQuota] = useState<number>(MAX_MONTHLY_LIMIT)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages((currentMessages) => {
      if (currentMessages.length !== 1 || currentMessages[0].sender !== 'bot') {
        return currentMessages
      }

      return [{
        ...currentMessages[0],
        text: t('Halo! Saya VAI, AI Assistant resmi portofolio Vincen. Silakan tanyakan apa saja seputar pengalaman kerja, keahlian teknis, atau proyek-proyek dia!'),
      }]
    })
  }, [language, t])

  // Auto-resize tinggi textarea sesuai dengan konten pengguna
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 112)}px`
    }
  }, [input])

  // Otomatis gulir ke pesan paling bawah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Cek & hitung sisa kuota bulanan dari localStorage
    const checkQuota = (): QuotaCheckResult => {
    const currentDate = new Date()
    const currentMonthKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}`

    const savedMonth = localStorage.getItem('chat_month')
    let currentUsage = parseInt(
      localStorage.getItem('chat_usage_count') || '0',
      10
    )

    if (savedMonth !== currentMonthKey) {
      localStorage.setItem('chat_month', currentMonthKey)
      localStorage.setItem('chat_usage_count', '0')
      currentUsage = 0
    }

    setRemainingQuota(Math.max(0, MAX_MONTHLY_LIMIT - currentUsage))
    return {
      allowed: currentUsage < MAX_MONTHLY_LIMIT,
      currentUsage,
    }
  }

  useEffect(() => {
    checkQuota()
  }, [])

  const submitChat = async (): Promise<void> => {
    if (!input.trim() || loading) return

    const userText = input.trim()
    setInput('')

    // Reset tinggi textarea ke kondisi awal
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Batasi kuota penggunaan pengguna
    const quota = checkQuota()
    if (!quota.allowed) {
        setMessages((prev: ChatMessage[]) => [
        ...prev,
        { sender: 'user', text: userText },
        {
          sender: 'bot',
            text: t('Maaf, Anda telah mencapai batas maksimal (${MAX_MONTHLY_LIMIT} pertanyaan) untuk bulan ini. Silakan hubungi Vincensius secara langsung via LinkedIn atau Email!'),
        },
      ])
      return
    }

      setMessages((prev: ChatMessage[]) => [...prev, { sender: 'user', text: userText }])
    const newUsage = quota.currentUsage + 1
    localStorage.setItem('chat_usage_count', newUsage.toString())
    setRemainingQuota(MAX_MONTHLY_LIMIT - newUsage)

    setLoading(true)

      let currentUsageForRollback = newUsage

      try {
      const systemPrompt = `
Kamu adalah VAI, AI Assistant resmi untuk portofolio Vincensius Prasetyo Adi.
Tugas utama kamu adalah menjawab pertanyaan pengunjung situs, recruiter, atau hiring manager seputar latar belakang profesional, keahlian teknis, dan proyek-proyek Vincensius berdasarkan dokumen Knowledge Base di bawah ini.

==================================================
KNOWLEDGE BASE: SUMMARY PROFIL & PENGALAMAN
==================================================
${profileContent}

==================================================
KNOWLEDGE BASE: DOKUMENTASI PROYEK (.MD)
==================================================
${projectsContent}

==================================================
ATURAN TAMPILAN JAWABAN (KERAPIAN VISUAL)
==================================================
1. PEMISAH BARIS (DOUBLE ENTER):
   - Berikan 1 baris kosong (Double Enter / \\n\\n) sebelum dan sesudah membuat daftar (list) atau kelompok informasi baru.

2. JUDUL KATEGORI (BOLD + EMOJI):
   - Gunakan huruf tebal (bold) untuk judul kategori utama, misalnya: **[INFO] Data Engineering & Cloud Pipeline:**

3. STRUKTUR BULLET BERSIH:
   - Gunakan karakter "- " (strip + spasi) untuk setiap poin utama.
   - Gunakan **bolding** hanya pada kata kunci utama (nama tools, metrik angka, atau modul).
         - Gunakan *italic* untuk penekanan halus (misal: *business intelligence*, *data warehouse*).

      4. KEPADATAN TEKS:
         - Maksimal 3-4 poin per kelompok informasi agar pembaca tidak lelah.

      ==================================================
      BATASAN KEAMANAN (GUARDRAILS)
      ==================================================
      1. Jawab HANYA berdasarkan informasi pada Knowledge Base di atas.
      2. WAJIB menjawab hanya dalam ${language === 'ID' ? 'Bahasa Indonesia' : 'Bahasa Inggris'}. Jangan mencampur bahasa atau mengikuti bahasa dokumen Knowledge Base.
      3. Gunakan bahasa yang **natural, ramah, profesional, dan ringkas** - seperti asisten nyata yang mengenal Vincensius dengan baik. Maksimal 3-4 kalimat atau 3-4 bullet, langsung ke jawaban tanpa pembuka bertele-tele.
      4. Keluarkan HANYA jawaban akhir. JANGAN PERNAH menampilkan proses berpikir, analisis input, langkah bernomor, atau penjelasan soal aturan bahasa.
      5. **JANGAN menyebutkan sumber, Knowledge Base, dokumentasi, atau atribusi apapun** - jawab langsung seperti kamu tahu informasinya.
      6. Jika ditanya di luar topik portofolio/pengalaman Vincensius, TOLAK dengan sopan:
         "Maaf, saya hanya difungsikan untuk menjawab pertanyaan seputar portofolio, keahlian teknis, dan pengalaman kerja Vincensius."
      `

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                  model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userText },
          ],
                stream: true,
                max_tokens: 512,
                temperature: 0.3,
                // Nemotron 3.5 adalah reasoning model: tanpa flag ini, proses berpikirnya
                // bocor ke content sehingga jawaban jadi bertele-tele
                chat_template_kwargs: { enable_thinking: false },
              }),
            })
      // Pengecekan HTTP Error (Termasuk kuota/token habis 402/429 atau server error 500)
      if (!response.ok) {
        const errorBody = await response.text()
        let apiError = ''
        try {
          apiError = JSON.parse(errorBody)?.error?.message || ''
        } catch {
          apiError = ''
        }
        console.error('NVIDIA API request failed', {
          status: response.status,
          body: errorBody,
        })
        const error = new Error(`API Error Status: ${response.status}`)
        error.status = response.status
        error.apiMessage = apiError
        throw error
      }

      // Handle streaming response
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let botReply = ''
            let isFirstChunk = true

            if (reader) {
              // Add empty bot message first for streaming
              setMessages((prev: ChatMessage[]) => [...prev, { sender: 'bot', text: '' }])

              while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6)
                    if (dataStr === '[DONE]') continue

                    try {
                      const parsed = JSON.parse(dataStr)
                                                              const delta = parsed.choices?.[0]?.delta
                                                                                    // Explicitly ignore reasoning_content (model's internal thinking process)
                                                                                    const content = delta?.content
                                                                                    if (content) {
                                                                                      botReply += content
                                                                                      const filteredReply = sanitizeBotReply(botReply)
                                                                                      // Update the last message with accumulated content
                                                                                      setMessages((prev: ChatMessage[]) => {
                                                                                        const updated = [...prev]
                                                                                        updated[updated.length - 1] = { ...updated[updated.length - 1], text: filteredReply }
                                                                                        return updated
                                                                                      })
                                                                                    }
                                                                                  } catch {
                                                                                    // Ignore parse errors for incomplete chunks
                                                                                  }
                        }
                      }
                    }
                  } else {
              // Fallback for non-streaming
              const data = await response.json()
              botReply = sanitizeBotReply(data?.choices?.[0]?.message?.content || '')

              if (!botReply) {
                throw new Error(t('Jawaban API kosong'))
              }

              setMessages((prev: ChatMessage[]) => [...prev, { sender: 'bot', text: botReply }])
            }
          } catch (err: unknown) {
      console.error('Chatbot request failed', err)
            const failedUsage = Math.max(0, currentUsageForRollback - 1)
      localStorage.setItem('chat_usage_count', failedUsage.toString())
      setRemainingQuota(MAX_MONTHLY_LIMIT - failedUsage)
      
            const errorWithStatus = err as { status?: number }
            const unavailableMessage =
              errorWithStatus.status === 429
                            ? t('Model NVIDIA Nemotron sedang sibuk. Silakan tunggu beberapa saat lalu coba lagi.')
                : t('AI Assistant sedang mengalami gangguan. Silakan coba lagi nanti.')

            setMessages((prev: ChatMessage[]) => [
              ...prev,
              {
                sender: 'bot',
                text: unavailableMessage,
              },
            ])
          } finally {
            setLoading(false)
          }
        }

        const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault()
          submitChat()
        }

        // Handling Keydown: Keyboard Navigation + Auto Bulleting
        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
          const textarea = textareaRef.current
          if (!textarea) return

          const { selectionStart, selectionEnd, value } = textarea

          // 1. Auto Convert "- " menjadi "| " saat menekan Spasi
          if (e.key === ' ' && selectionStart === selectionEnd) {
            const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
            const currentLine = value.substring(lineStart, selectionStart)

            if (currentLine === '-') {
              e.preventDefault()
              const newValue =
                value.substring(0, lineStart) + '| ' + value.substring(selectionEnd)
              setInput(newValue)

              setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = lineStart + 2
              }, 0)
              return
            }
          }

          // 2. Meneruskan Bullet "| " otomatis saat Shift+Enter
          if (e.key === 'Enter' && e.shiftKey && selectionStart === selectionEnd) {
            const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
            const currentLine = value.substring(lineStart, selectionStart)

            if (currentLine.startsWith('| ')) {
              e.preventDefault()
              const insertText = '\n| '
              const newValue =
                value.substring(0, selectionStart) +
                insertText +
                value.substring(selectionEnd)
              setInput(newValue)

              setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd =
                  selectionStart + insertText.length
              }, 0)
              return
            }
          }

          // 3. Enter tanpa Shift: Kirim Pesan
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submitChat()
          }
        }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Tombol Floating Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1F3A5F] text-white font-bold shadow-lg shadow-[#1F3A5F]/20 hover:bg-[#3D5A80] hover:scale-105 transition-all cursor-pointer border border-slate-200"
        >
            <span className="text-lg">{t('VAI')}</span>
            <span className="text-xs">{t('Ask Assistant')}</span>
        </button>
      )}

      {/* Window Chatbot */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200 bg-[#E0F0FF]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-lg">{t('VAI')}</span>
              <div>
                <h3 className="text-xs font-bold text-[#1F3A5F]">
                    {t('AI Assistant')}
                </h3>
                <p className="text-[10px] text-[#3D5A80] font-mono">
                                                                    {t('Powered by NVIDIA | Quota: {remainingQuota}/{MAX_MONTHLY_LIMIT}')
                                      .replace('{remainingQuota}', remainingQuota.toString())
                                      .replace('{MAX_MONTHLY_LIMIT}', MAX_MONTHLY_LIMIT.toString())}
                                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-[#1F3A5F] text-xs p-1 cursor-pointer"
            >
              X
            </button>
          </div>

          {/* Area History Chat */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 text-xs bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Bubble Chat */}
                <div
                  className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#1F3A5F] text-white self-end ml-auto shadow-xs'
                      : 'bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs self-start mr-auto'
                  }`}
                >
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-500 p-2.5 rounded-xl text-xs animate-pulse border border-slate-200">
                                {t('NVIDIA Nemotron sedang berpikir...')}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input Chat */}
          <form
            onSubmit={handleFormSubmit}
            className="p-2.5 border-t border-slate-200 bg-white flex items-end gap-2"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
                placeholder={t('Tanyakan sesuatu... (- + spasi untuk bullet)')}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1F3A5F] focus:bg-white resize-none max-h-28 leading-relaxed overflow-y-auto"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3.5 py-2 rounded-xl bg-[#1F3A5F] text-white font-bold text-xs hover:bg-[#3D5A80] disabled:opacity-50 cursor-pointer transition-colors shadow-2xs self-end"
            >
                {t('Kirim')}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

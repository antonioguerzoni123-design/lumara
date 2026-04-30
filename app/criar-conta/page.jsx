import { SignUp } from '@clerk/nextjs';

const clerkAppearance = {
  variables: {
    colorPrimary: '#8B6BE0',
    colorBackground: '#FFFFFF',
    colorText: '#1A1A2E',
    colorTextSecondary: '#6B6B8A',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#1A1A2E',
    borderRadius: '14px',
    fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
  },
  elements: {
    card: 'shadow-sm border border-[#E8E0F0] !rounded-2xl',
    formButtonPrimary: '!bg-[#8B6BE0] hover:!bg-[#7a5cd0] !text-white',
    footerActionLink: '!text-[#8B6BE0] hover:!text-[#7a5cd0]',
    headerTitle: '!font-semibold !text-[#1A1A2E]',
    socialButtonsBlockButton: '!border-[#E8E0F0] hover:!border-[#B89EF0]',
    formFieldInput: '!border-[#E8E0F0] focus:!border-[#8B6BE0] !rounded-xl',
  },
};

export default function CriarContaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FB] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span
            className="text-2xl font-black tracking-[-0.5px] text-[#1A1A2E]"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            lumara<span style={{ color: '#E0689F', fontSize: '10px', verticalAlign: 'super' }}>●</span>
          </span>
          <p className="mt-2 text-sm text-[#6B6B8A]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Cria a tua conta de beleza
          </p>
        </div>
        <SignUp appearance={clerkAppearance} />
      </div>
    </div>
  );
}

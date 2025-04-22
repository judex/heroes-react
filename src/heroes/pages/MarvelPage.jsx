import { HeroList } from "../components/HeroList"

export const MarvelPage = () => {
  return (
    <>
      <div className="font-black text-2xl mb-6">Marvel Page</div>
      <HeroList publisher="Marvel Comics" />
    </>
  )
}
